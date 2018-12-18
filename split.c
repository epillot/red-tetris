char    *ft_strtrim(char const *s)
{
    int     i;
    int     t;
    char    *str;
    i = 0;
    while (*s == ' ' || *s == '\n' || *s == '\t')
        s += 1;
    i = strlen(s - 1);
    while (s[i]== ' ' || s[i] == '\n' || s[i] == '\t')
        i--;
    i++;
    if (!(str = malloc(sizeof(char) * (i + 1))))
        return (NULL);
    t = i;
    i = 0;
    while (i < t)
    {
        str[i] = s[i];
        i++;
    }
    str[i] = '\0';
    return (str);
}
int     main(int ac, char **av)
{
    if (ac == 2)
        printf("%s\n", ft_strtrim(av[1]));
}
