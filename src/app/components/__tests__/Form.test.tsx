import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TranslateForm from "../TranslateForm";

describe("TranslateForm component", () => {
  const mockProps = {
    original: "",
    onOriginalChange: jest.fn(),
    lang: "fr" as const,
    onLangChange: jest.fn(),
    onTranslate: jest.fn(),
    remainingRequests: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with correct structure", () => {
    render(<TranslateForm {...mockProps} />);
    expect(screen.getByTestId("translate-form")).toBeInTheDocument();
    expect(screen.getByText("Text to translate 👇")).toBeInTheDocument();
    expect(screen.getByText("Select language 👇")).toBeInTheDocument();
  });

  it("renders textarea with correct value and attributes", () => {
    render(<TranslateForm {...mockProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("");
  });

  it("calls onOriginalChange when textarea value changes", () => {
    render(<TranslateForm {...mockProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    expect(mockProps.onOriginalChange).toHaveBeenCalledWith("Hello world");
  });

  it("renders all language options with flags", () => {
    render(<TranslateForm {...mockProps} />);
    expect(screen.getByLabelText("French")).toBeInTheDocument();
    expect(screen.getByLabelText("Spanish")).toBeInTheDocument();
    expect(screen.getByLabelText("Japanese")).toBeInTheDocument();

    const flags = screen.getAllByRole("img");
    expect(flags).toHaveLength(3);
    expect(flags[0]).toHaveAttribute("src", "/flags/fr-flag.png");
    expect(flags[1]).toHaveAttribute("src", "/flags/sp-flag.png");
    expect(flags[2]).toHaveAttribute("src", "/flags/jpn-flag.png");
  });

  it("shows correct language selected by default", () => {
    render(<TranslateForm {...mockProps} />);
    const frenchOption = screen.getByLabelText("French");
    expect(frenchOption).toBeChecked();
  });

  it("calls onLangChange when language selection changes", () => {
    render(<TranslateForm {...mockProps} />);
    const spanishOption = screen.getByLabelText("Spanish");
    fireEvent.click(spanishOption);
    expect(mockProps.onLangChange).toHaveBeenCalledWith("es");
  });

  it("calls onTranslate when translate button is clicked", () => {
    render(<TranslateForm {...mockProps} />);
    const translateButton = screen.getByRole("button", { name: "Translate" });
    fireEvent.click(translateButton);
    expect(mockProps.onTranslate).toHaveBeenCalled();
  });

  it("displays original text in textarea when provided", () => {
    render(<TranslateForm {...mockProps} original="Bonjour le monde" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue("Bonjour le monde");
  });

  it("updates selected language when lang prop changes", () => {
    const { rerender } = render(<TranslateForm {...mockProps} />);
    expect(screen.getByLabelText("French")).toBeChecked();

    rerender(<TranslateForm {...mockProps} lang="es" />);
    expect(screen.getByLabelText("Spanish")).toBeChecked();
  });

  it("handles long text content", () => {
    const longText = "a".repeat(1000);
    render(
      <TranslateForm {...mockProps} original={longText} remainingRequests={5} />
    );

    expect(screen.getByDisplayValue(longText)).toBeInTheDocument();
  });

  it("displays remaining requests correctly", () => {
    render(
      <TranslateForm {...mockProps} original="Hello" remainingRequests={7} />
    );

    expect(screen.getByText("Remaining requests: 7")).toBeInTheDocument();
  });
});
