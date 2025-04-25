interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            <span className="error-message__icon">⚠️</span>
            <p className="error-message__text">{message}</p>
        </div>
    );
};

export default ErrorMessage;
