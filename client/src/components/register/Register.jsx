/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../service/helper";
import Loader from "../loader/Loader";
import styles from "./Register.module.css";

const LoginForm = ({ handelSetTab }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const errColor = {
    border: "1px solid red",
  };

  const handelClickSetTab = (e) => {
    e.preventDefault();
    handelSetTab("login");
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!user.name || !user.phone || !user.email || !user.password) {
      setError(true);
      toast.error("All fields required", {
        position: "top-right",
      });
    } else {
      setLoading(true);
      try {
        const { data } = await axios.post(`${BASE_URL}/auth/register`, user);
        setLoading(false);
        localStorage.removeItem("page");
        localStorage.setItem("details", JSON.stringify(data));
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className={styles.outer_div}>
      {window.screen.width >= 320 && window.screen.width <= 425 && (
        <p className={styles.welcome}>Welcome</p>
      )}
      <div className={styles.inner_div}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleContinue}>
            {window.screen.width >= 320 && window.screen.width <= 425 ? (
              <div className={styles.query_container}>
                <p className={styles.form_name}>Create Account.</p>
                <p className={styles.query}>Don't have an account?</p>
              </div>
            ) : (
              <p className={styles.form_name}>Create Account</p>
            )}

            <div className={styles.name}>
              <label htmlFor="name" className={styles.label}>
                Your name
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                style={error && user.name.length === 0 ? errColor : null}
              />
              {error && user.email.length === 0 && (
                <p className={styles.error}>*required field</p>
              )}
            </div>

            <div className={styles.name}>
              <label htmlFor="email" className={styles.label}>
                Mobile number
              </label>
              <input
                type="phone"
                id="phone"
                className={styles.input}
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                style={error && user.email.length === 0 ? errColor : null}
              />
              {error && user.email.length === 0 && (
                <p className={styles.error}>*required field</p>
              )}
            </div>

            <div className={styles.name}>
              <label htmlFor="email" className={styles.label}>
                Email id
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                style={error && user.email.length === 0 ? errColor : null}
              />
              {error && user.email.length === 0 && (
                <p className={styles.error}>*required field</p>
              )}
            </div>

            <div className={styles.name}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={error && user.password.length === 0 ? errColor : null}
              />
              {error && user.email.length === 0 && (
                <p className={styles.error}>*required field</p>
              )}
            </div>

            <p className={styles.policy}>
              By enrolling your mobile number, you consent to receive automated
              security notification via text message from Musicart. Message and
              data rates may apply
            </p>

            <div className={styles.btn}>
              <button type="submit" className={styles.continue}>
                {loading ? <Loader /> : "Continue"}
              </button>
            </div>

            <p className={styles.term_condition}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
      <div className={styles.sign_in_msg}>
        <p>Already have an account?</p>
        <p className={styles.sign_in} onClick={(e) => handelClickSetTab(e)}>
          Sign in
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
