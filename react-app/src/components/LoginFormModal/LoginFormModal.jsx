import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  return (
    <div className="login-modal">
      <div className="modal-head">
        <h2>Log In</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-modal">
        <div className="input-containers">
          {errors.email && <p className="errors">{errors.email}</p>}

          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-containers">

          {errors.password && <p className="errors">{errors.password}</p>}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="filter-buttons">Log In</button>
        <button
          className="filter-buttons"
          onClick={demoLogin}
        >Demo Login</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
