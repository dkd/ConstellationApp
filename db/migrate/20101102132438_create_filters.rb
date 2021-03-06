class CreateFilters < ActiveRecord::Migration
  def self.up
    create_table :filters do |t|
      t.string :property
      t.string :query_type
      t.string :equals
      t.string :start
      t.string :end

      t.timestamps
    end
  end

  def self.down
    drop_table :filters
  end
end
