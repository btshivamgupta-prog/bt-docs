# Introduction

**Project Two** is a frontend component library for building modern user interfaces with speed and consistency.

## Philosophy

- **Composable**: Mix and match components freely.
- **Accessible**: WCAG 2.1 AA compliant out of the box.
- **Themeable**: Full design token support for custom branding.
- **Tree-shakeable**: Only ship what you use.

## Quick Example

````jsx
import { Button, Input } from '@your-org/project-two'

function LoginForm() {
  return (
    <form>
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button variant="primary">Sign In</Button>
    </form>
  )
}
````

## Supported Frameworks

| Framework  | Status |
|-----------|--------|
| React     | Stable |
| Vue 3     | Stable |
| Svelte    | Beta   |

## Next Steps

- [Installation](./installation) — Get it set up.
- [Theming](./theming) — Customize the look and feel.
