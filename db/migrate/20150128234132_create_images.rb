class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url
      t.string :title
      t.string :username

      t.timestamps
    end
  end
end
