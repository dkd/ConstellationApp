require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe ViewsController do
  include Devise::TestHelpers

  describe "GET /views" do
    it_should_be_protected :index
  end

end
