module RSpec::Core

    class ExampleGroup
      class << self

        #
        # This macro is available inside of each controller spec:
        #
        # describe UsersController do
        #   describe "/users" do
        #     it_should_be_protected :index
        #   end
        # end
        #
        def it_should_be_protected(method, action, options={})
          describe "Authentication" do
            before(:each) do
              @user = Factory.build(:user, :email => "testerno1@constellationapp.org")
              @user.save
            end

            context "given a signed in user" do
              it "should be accessible" do
                sign_in :user, @user
                xhr method, action, options
                response.should be_success
              end
            end
            context "given a signed out user" do
              it "should not be accessible" do
                sign_out @user
                xhr method, action, options
                response.should_not be_success
              end
            end
          end
        end

      end
    end

end