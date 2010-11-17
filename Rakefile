# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require 'rake'

Constellation::Application.load_tasks

require 'active_support/core_ext/object/to_json'
require 'metric_fu'
  MetricFu::Configuration.run do |config|
  config.rcov[:test_files] = ['spec/**/*_spec.rb']
  config.rcov[:rcov_opts] << "-Ispec" # Needed to find spec_helper
end

