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

  private
  def image_params
    params.require(:image).permit(:url,:title,:username)
  end
end
