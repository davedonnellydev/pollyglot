import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Translator from "../translator";

describe("Translator component", () => {
  it("Renders Translator component", () => {
    render(<Translator />);
    const translatorComponent = screen.getByTestId("translator");
    expect(translatorComponent).toBeInTheDocument();
  });

  it("Renders all language options", () => {
    render(<Translator />);
    const frenchOption = screen.getByLabelText("French");
    const spanishOption = screen.getByLabelText("Spanish");
    const japaneseOption = screen.getByLabelText("Japanese");
    expect(frenchOption).toBeInTheDocument();
    expect(spanishOption).toBeInTheDocument();
    expect(japaneseOption).toBeInTheDocument();
  });

  it("French option selected by default", () => {
    render(<Translator />);
    const frenchOption = screen.getByLabelText("French");
    expect(frenchOption).toBeChecked();
  });

  it("Can change language selection", () => {
    render(<Translator />);
    const spanishOption = screen.getByLabelText("Spanish");
    fireEvent.click(spanishOption);
    expect(spanishOption).toBeChecked();
  });

  it("Textarea can be typed into", () => {
    render(<Translator />);
    const inputTextArea = screen.getByRole("textbox");
    fireEvent.change(inputTextArea, { target: { value: "hello" } });
    expect(inputTextArea).toHaveValue("hello");
  });
});
