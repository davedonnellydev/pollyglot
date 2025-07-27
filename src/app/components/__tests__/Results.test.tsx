import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultsView from "../ResultsView";

describe("ResultsView component", () => {
  const mockProps = {
    original: "Hello world",
    translation: "Bonjour le monde",
    onStartOver: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the results card", () => {
    render(<ResultsView {...mockProps} />);
    expect(screen.getByText("Original text 👇")).toBeInTheDocument();
    expect(screen.getByText("Your translation 👇")).toBeInTheDocument();
  });

  it("displays original text correctly", () => {
    render(<ResultsView {...mockProps} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("displays translation text correctly", () => {
    render(<ResultsView {...mockProps} />);
    expect(screen.getByText("Bonjour le monde")).toBeInTheDocument();
  });

  it("calls onStartOver when Start Over button is clicked", () => {
    render(<ResultsView {...mockProps} />);
    const startOverButton = screen.getByRole("button", { name: "Start Over" });
    fireEvent.click(startOverButton);
    expect(mockProps.onStartOver).toHaveBeenCalled();
  });

  it("handles empty original text", () => {
    render(<ResultsView {...mockProps} original="" />);
    const originalTextbox =
      screen.getByText("Original text 👇").nextElementSibling;
    expect(originalTextbox).toHaveTextContent("");
  });

  it("handles empty translation text", () => {
    render(<ResultsView {...mockProps} translation="" />);
    const translationTextbox = screen.getByText(
      "Your translation 👇"
    ).nextElementSibling;
    expect(translationTextbox).toHaveTextContent("");
  });

  it("handles long text content", () => {
    const longTextOriginal =
      "This is a very long text that should be displayed properly in the results view without any issues or truncation";
    const longTextTranslation =
      "This is also a very long text that should be displayed properly in the results view without any issues or truncation";
    render(
      <ResultsView
        {...mockProps}
        original={longTextOriginal}
        translation={longTextTranslation}
      />
    );
    expect(screen.getByText(longTextOriginal)).toBeInTheDocument();
    expect(screen.getByText(longTextTranslation)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<ResultsView {...mockProps} />);
    const card = screen.getByText("Original text 👇").closest("div");
    expect(card).toHaveClass("card");
  });
});
