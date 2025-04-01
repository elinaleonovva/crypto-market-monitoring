interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="error-message">
            <span>⚠️</span>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;