export const loadScript = (src, id, position = "body", mode = "") => {
  if (typeof window !== "undefined") {
    if (!document.querySelector(`#${id}`)) {
      const script = document.createElement("script");

      if (mode === "async") {
        script.setAttribute("async", "");
      } else if (mode === "defer") {
        script.setAttribute("defer", "");
      }

      script.setAttribute("id", id);
      script.src = src;
      document.querySelector(position).appendChild(script);
    }
  }
};
