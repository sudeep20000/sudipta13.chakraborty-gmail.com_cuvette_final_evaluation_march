import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRating from "../../components/starRating/StarRating";
import Carousel from "../carousel/Carousel";
import BASE_URL from "../../service/helper";
import styles from "./SelectedItem.module.css";
import Images from "../../images/Images";

const SelecteItem = ({ item, handelSeletedItem, handleComponentMount }) => {
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const navigate = useNavigate();

  const handelBackToProduct = (e) => {
    e.preventDefault();
    handelSeletedItem({}, "default");
  };

  const handelAddToCart = async (e) => {
    e.preventDefault();

    const {
      about,
      available,
      brand,
      color,
      features,
      images,
      model,
      price,
      rating,
      reviews,
      type,
    } = item;

    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) {
      navigate("/authenticate");
      return;
    }
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    try {
      const { data } = await axios.post(
        `${BASE_URL}/verified/addItem`,
        {
          about,
          available,
          brand,
          color,
          features,
          images,
          model,
          price,
          rating,
          reviews,
          type,
        },
        { headers }
      );
      handleComponentMount();
      console.log(`${data.itemName} added to cart`);
      toast.success(`${data.itemName} added to cart`, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-center",
      });
    }
  };

  const handelAddToCartAndGoCart = async (e) => {
    e.preventDefault();
    const {
      about,
      available,
      brand,
      color,
      features,
      images,
      model,
      price,
      rating,
      reviews,
      type,
    } = item;

    const details = JSON.parse(localStorage.getItem("details"));
    if (!details) {
      navigate("/authenticate");
      return;
    }
    const headers = {
      Authorization: `Bearer ${details.token}`,
    };

    try {
      toast.loading(`just a moment...`, {
        position: "top-center",
      });
      await axios.post(
        `${BASE_URL}/verified/addItem`,
        {
          about,
          available,
          brand,
          color,
          features,
          images,
          model,
          price,
          rating,
          reviews,
          type,
        },
        { headers }
      );
      navigate("/View_Cart");
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-center",
      });
    }
  };

  const handleImageClick = (src) => {
    if (src === selectedImage) {
      setSelectedImage(item.images[0]);
      return;
    }
    setSelectedImage(src);
  };

  return (
    <div className={styles.seletedItem_div}>
      <button className={styles.back_btn} onClick={handelBackToProduct}>
        {window.screen.width >= 320 && window.screen.width <= 425 ? (
          <img src={Images.image9} alt="backicon" />
        ) : (
          "Back to products"
        )}
      </button>

      <button
        className={styles.topBuyNow}
        onClick={(e) => handelAddToCartAndGoCart(e)}
      >
        Buy Now
      </button>

      <p className={styles.description}>{item.about}</p>
      <div className={styles.main_container}>
        <div className={styles.product_images_container}>
          <div className={styles.main_img}>
            <img src={selectedImage} alt={item.model} />
          </div>
          <div className={styles.secondary_imgs}>
            <div className={styles.inner_img}>
              <img
                src={item.images[1]}
                alt={item.model}
                onClick={() => handleImageClick(item.images[1])}
              />
            </div>
            <div className={styles.inner_img}>
              <img
                src={item.images[2]}
                alt={item.model}
                onClick={() => handleImageClick(item.images[2])}
              />
            </div>
            <div className={styles.inner_img}>
              <img
                src={item.images[3]}
                alt={item.model}
                onClick={() => handleImageClick(item.images[3])}
              />
            </div>
          </div>
        </div>

        <div className={styles.product_details}>
          <div className={styles.details_sec}>
            <p className={styles.product_name}>
              {item.brand} {item.model}
            </p>
            <div className={styles.rating}>
              <StarRating rating={item.rating} />
              <p className={styles.reviews}>
                ({item.reviews} Customer reviews)
              </p>
            </div>
            <p className={styles.price}>Price - ₹ {item.price}</p>
            <p className={styles.color}>
              {item.color} | {item.type} headphone
            </p>
            <div className={styles.about_container}>
              <p className={styles.about}>About this item</p>
              <ul className={styles.features_list}>
                {item.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <p className={styles.available}>
              <span>Available</span> -{" "}
              {item.available ? "In stock" : "Out of stock"}
            </p>
            <p className={styles.brand_name}>
              <span>Brand</span> - {item.brand}
            </p>
          </div>

          <div className={styles.btn_sec}>
            <button
              className={styles.addBtn}
              onClick={(e) => handelAddToCart(e)}
            >
              Add to cart
            </button>
            <button
              className={styles.buyNow}
              onClick={(e) => handelAddToCartAndGoCart(e)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mobile_main}>
        <Carousel images={item.images} />
        <div className={styles.details_sec}>
          <p className={styles.product_name}>
            {item.brand} {item.model}
          </p>
          <div className={styles.rating}>
            <StarRating rating={item.rating} />
            <p className={styles.reviews}>({item.reviews} Customer reviews)</p>
          </div>
          <p className={styles.desc}>{item.about}</p>
          <p className={styles.price}>Price - ₹ {item.price}</p>
          <p className={styles.color}>
            {item.color} | {item.type} headphone
          </p>
          <div className={styles.about_container}>
            <p className={styles.about}>About this item</p>
            <ul className={styles.features_list}>
              {item.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <p className={styles.available}>
            <span>Available</span> -{" "}
            {item.available ? "In stock" : "Out of stock"}
          </p>
          <p className={styles.brand_name}>
            <span>Brand</span> - {item.brand}
          </p>
        </div>
        <div className={styles.btn_sec}>
          <button className={styles.addBtn} onClick={(e) => handelAddToCart(e)}>
            Add to cart
          </button>
          <button
            className={styles.buyNow}
            onClick={(e) => handelAddToCartAndGoCart(e)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelecteItem;
