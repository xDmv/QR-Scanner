SHELL  := /bin/bash

#COLORS
RED    := $(shell tput -Txterm setaf 1)
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

IONIC        := $(shell command -v ionic 2> /dev/null )
APP_NAME     := SVM - med
APP_PATH     := android
APP_EXIST    := $(shell [ -d ./$(APP_PATH) ] && echo 'true' )
BUILD_DIR    := ../build
BUILD_DEV    := ''
BUILD_PROD   := --prod

@echo "$(APP_PATH): $(APP_EXIST)"

.PHONY: help
.DEFAULT_GOAL := help

help:
	@echo '$(WHITE)Available the following targets$(RESET):'
	@echo '$(YELLOW)build$(RESET):'
	@echo '  $(GREEN)build-dev   $(RESET) - build environment: dev'
	@echo '  $(GREEN)build-prod  $(RESET) - build environment: prod'
	@echo '$(YELLOW)development$(RESET):'
	@echo '  $(GREEN)serve   $(RESET) - builds, serves, rebuilding on changes'
	@echo '  $(GREEN)dep     $(RESET) - install node dependencies'
	@echo '$(YELLOW)setup$(RESET):'
	@echo '  $(GREEN)ionic   $(RESET) - install ionic, cordova'

build-dev:
build-dev:   TARGET=dev
build-dev:   BUILD_OPT := $(BUILD_DEV)
build-prod:
build-prod:  TARGET=prod
build-prod:  BUILD_OPT := $(BUILD_PROD)

build-%: ENVIRONMENT=$(subst build-,,$@)
build-%: dep ionic platform
	$(if ${BUILD_OPT},, $(error $(RED)Build environment ${ENVIRONMENT} is not defined$(RESET) ) )
	@echo "$(GREEN)Build: ${ENVIRONMENT}$(RESET)..."
	@cd $(APP_PATH) && ionic build $(BUILD_OPT)

serve: dep ionic
	@echo '$(GREEN)Serve$(RESET)...'
	@cd $(APP_PATH) && ionic serve --no-open

dep: dir
	@cd $(APP_PATH) && \
	if ! [ -d 'node_modules' ]; then \
		echo "$(GREEN)Dependencies$(RESET)..."; \
		npm install; \
	fi

platform: dir ionic
	@echo '$(GREEN)Platform$(RESET)...'
	@cd $(APP_PATH) && \
	ionic cordova platform add android

### create/remove angular sketch

remove: dir confirm
	@echo "$(GREEN)Remove app folder: '$(APP_PATH)'$(RESET)..."
	@rm -rf $(APP_PATH)

new: ionic
	$(if $(APP_EXIST), $(error $(RED)App path '$(APP_PATH)' is $(APP_EXIST) already exists$(RESET) ) )
	@echo "$(GREEN)New $(APP_EXIST)$(RESET)..."
	@ionic start $(APP_NAME) blank --condova --no-git --no-deps --no-link --display-name '$(APP_NAME)' && \
	mv $(APP_NAME) $(APP_PATH)

dir:
	$(if $(APP_EXIST),, $(error $(RED)App path '$(APP_PATH)' is not exists$(RESET) ) )

### install angular cli

ionic: ionic-install

ionic-install:
ifndef IONIC
	@npm install -g ionic cordova
	@ionic -v
endif

### helpers

confirm:
	$(if $(shell read -p "Are you sure $(RED)Yes$(RESET)/$(GREEN)No$(RESET)? " && shopt -s nocasematch && [[ "$$REPLY" =~ "yes" ]] && echo 'yes' ),, $(error $(RED)No$(RESET). ) )
# @echo '$(GREEN)Yes$(RESET).'
