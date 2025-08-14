import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 text-foreground border-b pb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-8 mb-4 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold mt-4 mb-2 text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside space-y-2 mb-6 ml-6 pl-2">
      {children}
    </ol>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside space-y-2 mb-6 ml-6 pl-2">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="leading-7 text-muted-foreground">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="rounded-lg bg-muted p-4 mb-4">{children}</pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
