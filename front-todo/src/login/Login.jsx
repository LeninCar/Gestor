import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import ReCAPTCHA from "react-google-recaptcha";
import './Login.css';

function Login() {
  return (
    <div>
      <section className="form-information" id="registro">
        <div className="form-information-childs">
          <h2>Iniciar Sesión</h2>
          {/* <form className="form" onSubmit={handleSubmit}> */}
          <form className="form" >
            <label>
              <BiEnvelope />
              <input
                type="email"
                placeholder="Correo Electrónico"
                // value={correo}
                // onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </label>
            <label>
              <BiLockAlt />
              <input
                type="password"
                placeholder="Contraseña"
                // value={contrasena}
                // onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </label>

            <ReCAPTCHA className="R"
              sitekey="6LdOcBopAAAAAP7wvy9zg2XIFd5Wfv3D7cLTf3WA"
              // onChange={(value) => setRecaptchaValue(value)}
            />
            <br />
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
            <input type="submit" value="Iniciar" />
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login