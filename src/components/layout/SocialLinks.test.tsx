import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SocialLinks from "./SocialLinks";

describe("SocialLinks", () => {
  it.each(["Instagram", "TikTok", "YouTube", "X", "Threads", "Facebook"])("incluye enlace a %s", (label) => {
    render(<SocialLinks />);

    const link = screen.getByRole("link", { name: label });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
