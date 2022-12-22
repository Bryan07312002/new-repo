import { describe, it, expect } from "vitest";
import Storage from "../storage";
import * as dotenv from "dotenv";
dotenv.config();

interface Test {
  name: string;
  Password: string;
}

describe("class Storage", () => {
  it("Should store objs", () => {
    // Instatiate classes
    const storage = new Storage<Test>();
    const obj_to_store: Test = { name: "Hello", Password: "hello" };

    // Store item with key "test"
    storage.setItem("test", obj_to_store);

    // Get item with key "test"
    const item_returned_before_removal = storage.getItem("test");

    // Remove item with key "test"
    storage.removeItem("test");

    // Get item with key "test"
    const item_returned_after_removal = storage.getItem("test");

    // Test result
    expect(item_returned_before_removal).toBe(JSON.stringify(obj_to_store));
    // If item doesn´t exists should return null
    expect(item_returned_after_removal).toBeNull();
  });
  it("Should store strings", () => {
    // Instatiate classes
    const storage = new Storage<string>();
    const str_to_store = "Hello";

    // Store item with key "test"
    storage.setItem("test", str_to_store);

    // Get item with key "test"
    const item_returned_before_removal = storage.getItem("test");

    // Remove item with key "test"
    storage.removeItem("test");

    // Get item with key "test"
    const item_returned_after_removal = storage.getItem("test");

    // Test result
    expect(item_returned_before_removal).toBe(str_to_store);
    // If item doesn´t exists should return null
    expect(item_returned_after_removal).toBeNull();
  });
});
