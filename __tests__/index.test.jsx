// __tests__/index.test.jsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Checks that div has correct classname", () => {
    render(<Home />);
    const div = screen.getByTestId("wrapper");
    expect(div.className).toBe("list-group");
  });
});
