# Introduction

**Project Three** is a CLI tool for automating deployments and DevOps workflows.

## What Can It Do?

- **Deploy** applications to multiple environments with a single command.
- **Rollback** safely to any previous version.
- **Monitor** deployment status in real-time.
- **Integrate** with GitHub Actions, Jenkins, GitLab CI.

## Quick Example

````bash
# Deploy to staging
project-three deploy --env staging --app my-api

# Check status
project-three status --app my-api

# Rollback if needed
project-three rollback --app my-api --version 1.2.0
````

## Installation

See the [Installation](./installation) page for platform-specific instructions.

## Architecture

````
+----------+     +--------------+     +----------+
¦  GitHub  ¦----?¦ Project Three ¦----?¦  Server  ¦
¦  Actions ¦     ¦   (CLI/API)   ¦     ¦  Farm    ¦
+----------+     +--------------+     +----------+
````
