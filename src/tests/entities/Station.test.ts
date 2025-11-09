import { Station } from "../../entities";
import { describe, it, expect } from "vitest";

describe("Station", () => {
  it("should create station with given name", () => {
    const station = new Station("Londonium Bridge Station", 1);
    expect(station.getName()).toBe("Londonium Bridge Station");
    expect(station.getZone()).toBe(1);
  });

  it("should have only name and zone as properties", () => {
    const station = new Station("Earl's Court", 2);

    expect(Object.keys(station)).toEqual(["name", "zone"]);

    expect(station).not.toHaveProperty("id");
    expect(station).not.toHaveProperty("balance");
  });
});
