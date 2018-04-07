import React from "react";

import sinon from "sinon";
import { mount } from "enzyme";

import withOutsideHandler from "./withOutsideHandler";

describe("withOutsideHandler coponent", () => {
  beforeAll(() => {
    const div = document.createElement("div");
    div.setAttribute("id", "app");
    document.body.appendChild(div);
  });

  describe("Child component does not define onOutsideClick handler", () => {
    test("catch an error", () => {
      const spy = sinon.spy();

      class ErrorBoundary extends React.Component {
        componentDidCatch(error) {
          spy(error.message);
        }

        render() {
          return this.props.children;
        }
      }

      class Component extends React.Component {
        render() {
          return <div />;
        }
      }

      const WrappedComponent = withOutsideHandler(Component);

      const wrapper = mount(
        <ErrorBoundary>
          <WrappedComponent />
        </ErrorBoundary>,
        {
          attachTo: document.querySelector("#app")
        }
      );

      wrapper.detach();

      expect(
        spy.calledWith(
          `Component "Component" does not define "onOutsideClick" method.`
        )
      ).toBeTruthy();
    });
  });

  describe('Capture "click" events', () => {
    test("outside click events of wrapped component", () => {
      const spy = sinon.spy();
      class Component extends React.Component {
        onOutsideClick = () => {
          spy();
        };

        render() {
          return <div />;
        }
      }

      const WrappedComponent = withOutsideHandler(Component);

      const wrapper = mount(
        <div>
          <WrappedComponent />
          <div className="target">!</div>
        </div>,
        { attachTo: document.querySelector("#app") }
      );

      document
        .querySelector(".target")
        .dispatchEvent(new window.MouseEvent("click"));

      document
        .querySelector("#app")
        .dispatchEvent(new window.MouseEvent("click"));

      wrapper.detach();

      expect(spy.callCount).toEqual(2);
    });

    test("inside click events of wrapped component", () => {
      const spy = sinon.spy();

      class Component extends React.Component {
        onOutsideClick = () => {
          spy();
        };

        render() {
          return <div className="component" />;
        }
      }

      const WrappedComponent = withOutsideHandler(Component);

      const wrapper = mount(<WrappedComponent />, {
        attachTo: document.querySelector("#app")
      });

      document
        .querySelector(".component")
        .dispatchEvent(new window.MouseEvent("click"));

      wrapper.detach();

      expect(spy.callCount).toEqual(0);
    });
  });
});
