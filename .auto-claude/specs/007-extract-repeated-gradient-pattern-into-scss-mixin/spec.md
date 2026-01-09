# Extract repeated gradient pattern into SCSS mixin

## Overview

The gradient pattern 'linear-gradient(90deg, $primary-color 0%, $secondary-color 167%)' appears 16+ times across 10 SCSS files including hero.scss, button.scss, blog-card.scss, _header.scss, and _page-layout.scss with slight variations (107%, 167%).

## Rationale

Duplicated CSS patterns make maintenance difficult. When the brand gradient needs to change, developers must update multiple files, increasing the risk of inconsistencies.

---
*This spec was created from ideation and is pending detailed specification.*
