workflow "Contentful Publish" {
  on = "repository_dispatch"
  resolves = ["Publish"]
}

workflow "GitHub Push" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "docker://node:11"
  runs = "yarn"
  args = "install"
}

action "Lint" {
  needs = "Install"
  uses = "docker://node:11"
  runs = "yarn"
  args = "lint"
}

action "Master" {
  needs = "Lint"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Download Content" {
  needs = "Master"
  uses = "docker://node:11"
  runs = "yarn"
  args = "download-content"
  secrets = [
    "CONTENTFUL_SPACE_ID",
    "CONTENTFUL_ACCESS_TOKEN",
  ]
}

action "Build" {
  needs = "Download Content"
  uses = "docker://node:11"
  runs = "yarn"
  args = "build"
  env = {
    NODE_ENV = "production"
    PORT = "80"
    URL = "https://landonschropp.com"
  }
}

action "Validate HTML" {
  needs = "Build"
  uses = "docker://ruby"
  runs = "bin/validate-html"
}

action "Publish" {
  needs = "Validate HTML"
  uses = "maxheld83/ghpages@v0.2.1"
  env = {
    BUILD_DIR = "build"
  }
  secrets = ["GITHUB_TOKEN"]
}
