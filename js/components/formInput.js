export function createInput({ type, id, placeholder, required = false, autocomplete = "" }) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.required = required;
  input.autocomplete = autocomplete;
  return input;
}