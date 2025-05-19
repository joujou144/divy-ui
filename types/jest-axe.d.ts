import "jest-axe";

declare module "expect" {
  interface Matchers<R> {
    toHaveNoViolations(): R;
  }
}
