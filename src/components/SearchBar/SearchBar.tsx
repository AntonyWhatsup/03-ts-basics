
import css from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
    onSubmit: (query: string) => Promise<void>;
}

const notify = () => toast('Please enter your search query.');

export default function SearchBar({ onSubmit }: SearchBarProps) {

    const handleSubmit = (formData: FormData) => {
        const query = formData.get('query') as string;
        if (query === '') {
            notify();
            return;
        }
        onSubmit(query);
    }

    return (
        <>
            <header className={css.header}>
                <div className={css.container}>
                    <a
                        className={css.link}
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by TMDB
                    </a>
                    <form className={css.form} action={handleSubmit}>
                        <input
                            className={css.input}
                            type="text"
                            name="query"
                            autoComplete="off"
                            placeholder="Search movies..."
                            autoFocus
                        />
                        <button className={css.button} type="submit">
                            Search
                        </button>
                        <Toaster toastOptions={{
                            className: '',
                            style: {
                                background: '#ebcecbff',
                                border: '2px solid #713200',
                                padding: '16px',
                                color: '#0c0c0cff',
                            },
                        }} />
                    </form>
                </div>
            </header>
        </>
    )
}