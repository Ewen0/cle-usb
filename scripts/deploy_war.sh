#!/bin/bash

ssh -p 54072 ewen@178.62.7.182 "~/wildfly-8.1.0.Final/bin/jboss-cli.sh --connect --commands='deploy --force ~/cle-usb.war'"