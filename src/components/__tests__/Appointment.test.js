import React from "react";

import { 
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});