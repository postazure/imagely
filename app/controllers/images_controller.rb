class ImagesController < ApplicationController
  def index
    @images = Image.all
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render json: @image
    else
      render json: @image.errors, status: 422
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render json: @image
  end

  def update
    @image = Image.find(params[:id])
    update_hash = {}

    if params[:update_command] == "likes"
      update_hash[:likes] = @image.likes + 1
    end

    if @image.update(update_hash)
      render json: @image
    else
      render json: @image.errors, status: 422
    end
  end

  private
  def image_params
    params.require(:image).permit(:url,:title,:username,:likes)
  end
end
