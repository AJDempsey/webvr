AFRAME.registerPrimitive("a-hover-link", {
  defaultComponents: {
    link: {peekMode: true}
  },
  mappings: {
    href: "link.href",
    title: "link.title",
    titlecolor: "link.titleColor",
    bordercolor: "link.borderColor",
    image: "link.image",
    to: "scale-on-hover.to"
  }
});
