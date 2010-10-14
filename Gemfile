source 'http://rubygems.org'

# Rails
gem 'rails', '3.0.0'

# Database
gem 'mysql'

# Constellation
gem 'cassandra', :require => 'cassandra/0.7'
gem 'uuid'
gem 'constellation'

# Authentication
gem 'devise'

# Frontend
gem 'haml'
gem 'sass'

# Deployment
gem 'capistrano'

group :development do
  gem 'hpricot'
  gem 'ruby_parser'
end

# Development and testing
group :test, :development do
  gem 'rspec', '2.0.0'
  gem 'rspec-rails', '2.0.0'
  gem 'metric_fu'
  gem 'nokogiri'
  gem 'capybara'
  gem 'cucumber-rails'
  gem 'database_cleaner'
  gem 'factory_girl_rails'
  gem 'ruby-debug' if RUBY_VERSION.include? "1.8"
end

group :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'
end