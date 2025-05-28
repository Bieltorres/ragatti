import { useNavigate } from "react-router-dom";
import { Card } from "../../Components/Card";
import s from "./style.module.css";
import { useState } from "react";
import { Loader } from "../../Components/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/slices/userSlice";
import { apiUrl } from "../../Functions";

export const Login = () => {
    const [formData, setFormData] = useState({
        nome: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    }

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/pacientes/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const paciente = await response.json();
            dispatch(setUser({ name: paciente.nome }));
            navigate('/horarios-disponiveis');
        } catch (err) {
            console.error(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={s.wrapper}>
            <div className={s.backgroundContainer}>
                <img src="https://rigatti.clinicarigatti.com.br/wp-content/uploads/2025/02/BG-VIDEOS.png.webp" alt="" className={s.backgroundImage} />
            </div>
            <Card className={s.card}>
                <div className={s.cardContent}>
                    <img src="https://rigatti.clinicarigatti.com.br/wp-content/uploads/2025/02/RIGATTI-assinatura-principal-dourado.png.webp" alt="" className={s.logoHeader} />
                    <h1 className={s.welcomeTitle}>Bem-vindo de volta!</h1>
                    <p className={s.welcomeSubtitle}>Faça login para continuar</p>

                    <div className={s.formLogin}>
                        {error && <div className={s.errorMessage}>{error}</div>}

                        <div className={s.inputGroup}>
                            <label>Usuário</label>
                            <div className={s.inputWithIcon}>
                                <span className={s.inputIcon}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Digite seu usuário"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button className={s.loginButton} onClick={handleLogin}>
                            Entrar
                        </button>

                        <div className={s.orDivider}>
                            <span>Ou entre com</span>
                        </div>

                        <div className={s.socialButtons}>
                            <button className={s.socialButton}>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </button>
                            <button className={s.socialButton}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </button>
                            <button className={s.socialButton}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                        </div>

                        <div className={s.signupLink}>
                            Não tem uma conta? <span className={s.signupLinkText}>Cadastre-se agora</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className={s.footer}>
                © 2025 Gabriel Torres. Feito com ❤️ por Gabriel Torres
            </div>

            {loading && <Loader />}
        </div>
    )
}