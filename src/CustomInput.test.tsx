import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomInput from "./CustomInput";

describe("Yest suite 2", () => {
  test("should call the onChange callback handler when using the userEvent API", async () => {
    const onChange = jest.fn();
    render(
      <CustomInput value="" onChange={onChange}>
        Input:
      </CustomInput>
    );
    await userEvent.type(screen.getByRole("textbox"), "Moyise");
    expect(onChange).toHaveBeenCalledTimes(6);
  });
});
