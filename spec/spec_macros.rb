module RSpec::Core

    class ExampleGroup
      class << self

        def it_should_be_protected(action)
          describe "Authentication" do
            before(:each) do
              @user = Factory.build(:user, :email => "testerno1@constellationapp.org")
              @user.save
            end

            context "given a signed in user" do
              it "should be accessible" do
                sign_in :user, @user
                get action
                response.should be_success
              end
            end
            context "given a signed out user" do
              it "should not be accessible" do
                sign_out @user
                get action
                response.should_not be_success
              end
            end
          end
        end

      end
    end

end