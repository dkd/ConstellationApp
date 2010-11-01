source 'http://rubygems.org'

# Rails
gem 'rails', '3.0.1'

# Database
gem 'mysql'

# Constellation
gem 'constellation', '0.0.3'

# Authentication
gem 'devise'

# Frontend
gem 'haml'
gem 'sass'

# Deployment
gem 'capistrano'

# Development
group :development, :test do
  gem 'haml-rails'
  gem 'hpricot'
  gem 'metric_fu'
  gem 'nokogiri'
end

# Testing
group :test do
  gem 'ruby_parser'
  gem 'rspec-rails', '2.0.0'
  gem 'rspec', '2.0.0'
  gem 'capybara'
  gem 'cucumber-rails'
  gem 'database_cleaner'
  gem 'factory_girl_rails'
  gem 'ruby-debug' if RUBY_VERSION.include? "1.8"
end

# Testing
group :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'
end