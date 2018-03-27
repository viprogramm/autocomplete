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
    test("throws an error", () => {
      expect(() => {
        class Component extends React.Component {
          render() {
            return <div />;
          }
        }

        const WrappedComponent = withOutsideHandler(Component);

        const initReactErrorLogging = Error.prototype.suppressReactErrorLogging;

        try {
          Error.prototype.suppressReactErrorLogging = true;

          const wrapper = mount(<WrappedComponent />, {
            attachTo: document.querySelector("#app")
          });

          wrapper.detach();
        } finally {
          Error.prototype.suppressReactErrorLogging = initReactErrorLogging;
        }
      }).toThrow(
        'Component "Component" does not define "onOutsideClick" method.'
      );
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
