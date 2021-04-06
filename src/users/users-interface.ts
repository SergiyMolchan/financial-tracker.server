interface userInterface {
    id: number,
    login: string,
    password: string,
    settings?: string | null,
    // email?: string | null
}

interface newUserInterface {
    login: string,
    password: string,
    confirmPassword: string,
    // email?: string
}

export { userInterface, newUserInterface };
