export default [
  {
    path: "/login/in",
    method: "POST",
    data: {
      code: 1,
      session: "aaaaaaa"
    }
  },
  {
    path: "/login/out",
    data: {
      code: 1
    }
  }
];
