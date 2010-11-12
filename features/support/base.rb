#
# Define several helper files that should get included
#
includes = ["common_helpers", "paths"]

includes.each { |file| require File.expand_path(File.join(File.dirname(__FILE__), file )) }