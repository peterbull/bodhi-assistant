#!/bin/bash

echo "Please enther the target openapi schema location(default: https://api.bodhicast.com/openapi.json):"
read schema

echo "Please enter the output directory name(default: ./bodhicast-api-schema.d.ts)"
read output_dir

if [ -z "$schema"]
then
    schema="https://api.bodhicast.com/openapi.json"
fi

if [ -z "$output_dir" ]
then
    output_dir="./bodhicast-api-schema.d.ts"
fi


npx openapi-typescript $schema -o $output_dir
