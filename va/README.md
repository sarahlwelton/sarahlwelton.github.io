# `va` (Italian, "goes/go")

Switch between different projects, using a JSON configuration.

## Installation

Tested on Mac OSX.

Install `jq`, clone the repo, link va.json to your home directory, source `va.sh` in your startup.

	brew install jq

	# assuming you have your working directories in a `couchbase` directory
	cd ~/couchbase
	git clone git@github.com:couchbaselabs/docs-tooling.git
	cd docs-tooling
	ln va/va.json $HOME
	echo ". $(pwd)/va/va.sh" >> ~/.zshrc

	# now restart your shell

## Usage

	❯ va nodejs  # no project selected, defaults to `doc`
	{
	  "dir": "~/couchbase/docs-sdk-nodejs/",
	  "url": "https://github.com/couchbase/docs-sdk-nodejs",
	  "live": "https://docs.couchbase.com/nodejs-sdk/current/hello-world/overview.html",
	  "stage": "https://docs-staging.couchbase.com/nodejs-sdk/current/hello-world/overview.html"
	}
	❯ pwd
	/Users/hakimcassimally/couchbase/docs-sdk-nodejs

	❯ va try  # nodejs + try
	{
	  "dir": "~/couchbase/try-cb-nodejs/",
	  "url": "https://github.com/couchbaselabs/try-cb-nodejs"
	}
	❯ pwd
	/Users/hakimcassimally/couchbase/try-cb-nodejs

	❯ va frontend  # frontend + try
	{
	  "dir": "~/couchbase/try-cb-frontend-v2/",
	  "url": "https://github.com/couchbaselabs/try-cb-frontend-v2"
	}
	❯ pwd
	/Users/hakimcassimally/couchbase/try-cb-frontend-v2

	❯ va rust  # rust has no `try` project, so defaults to `sdk` in this case
	{
	  "sdk": {
	    "dir": "~/couchbase/couchbase-rs",
	    "url": "https://github.com/couchbaselabs/couchbase-rs"
	  }
	}
	❯ pwd
	/Users/hakimcassimally/couchbase/couchbase-rs

`vaq` lets you run an arbitrary jq query on the config file.
It helpfully uses `jq -e` to set exit value as appropriate.

	❯ vaq .scala.doc
	{
	  "dir": "~/couchbase/docs-sdk-scala/",
	  "url": "https://github.com/couchbase/docs-sdk-scala/",
	  "live": "https://docs.couchbase.com/scala-sdk/current/hello-world/overview.html",
	  "stage": "https://docs-staging.couchbase.com/scala-sdk/current/hello-world/overview.html"
	}

You may have to quote your jq expression if it contains shell characters. Subsequent arguments are
passed to `jq`. See the examples with `-r` later, to show raw data (not formatted as JSON.)

`vap` is a wrapper around `vaq keys` to list all the available projects, for scripting.

	❯ vap
	c
	common
	dotnet
	frontend
	go
	java
	nodejs
	php
	python
	ruby
	rust
	scala

You can also select just the projects that match a certain predicate.
This uses `with_entries` to transform the json into a list of objects like
`{key: ..., value: ...}`.

For example, we could show just the projects where there is a `try` entry. 

	vap 'select(.value.try)'

### Examples 

To clone all the sdk-doc projects in one command:

	for PROJ in `vap`; do if GIT=$(vaq .$PROJ.doc.git -r); then git clone $GIT; fi; done

Or if you prefer...:

	for GIT in `vaq '.[] | .doc.git | select(strings)' -r`; do git clone $GIT; done

Select just the projects that have an `sdk` entry

	vaq 'with_entries(select(.value.sdk))'
