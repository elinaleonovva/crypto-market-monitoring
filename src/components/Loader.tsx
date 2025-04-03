// components/Loader.tsx
import * as React from 'react';
import '../styles';

interface LoaderProps {
    small?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ small = false }) => {
    return (
        <div className={`loader ${small ? 'loader-small' : ''}`}>
            <div className="loader-spinner" />
        </div>
    );
};

export default Loader;