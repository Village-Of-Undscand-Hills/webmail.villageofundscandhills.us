import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/LoginPage";
import { EmailList } from "./components/EmailList";
import { EmailView } from "./components/EmailView";
import { UserInfo } from "./components/UserInfo";
import { UserProfile } from "./components/UserProfile";
import { FolderList } from "./components/FolderList";
import { Inbox, AlertTriangle, Star, Send, Trash2 } from "lucide-react";
import type { Email, User, Folder } from "./types";
import { createClient } from "@supabase/supabase-js";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<{
    user: SupabaseUser;
    session: Session;
  } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      supabase.auth
        .signInWithPassword({
          email: username,
          password: password,
        })
        .then(({ data, error }) => {
          if (error) {
            console.error("Error logging in:", error.message);
            alert(
              "Your username or password is incorrect. Please try again. If you need help, please contact IT support."
            );
          } else {
            setIsLoggedIn(true);
            setSession(data);
            alert("You have successfully logged in. Welcome back!");
          }
        });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedEmail(null);
    setCurrentFolder("inbox");
    setShowProfile(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email || "");
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data[0]);
      }
    };

    const fetchEmails = async () => {
      const { data, error } = await supabase.rpc("get_user_emails");
      if (error) {
        console.error("Error fetching emails:", error.message);
      } else {
        console.log("Emails:", data);
        setEmails(data);
      }
    };

    if (session) {
      fetchUser();
      fetchEmails();
    }
  }, [session]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email || "");
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data[0]);
      }
    };

    const fetchEmails = async () => {
      const { data, error } = await supabase.rpc("get_user_emails");
      if (error) {
        console.error("Error fetching emails:", error.message);
      } else {
        console.log("Emails:", data);
        setEmails(data);
      }
    };

    if (session) {
      fetchUser();
      fetchEmails();
    }
  }, [session]);

  useEffect(() => {
    const icons = {
      inbox: Inbox,
      important: Star,
      sent: Send,
      spam: AlertTriangle,
      trash: Trash2,
    };

    const folderNames = Object.keys(icons);
    const folderMap = new Map<string, Folder>();

    folderNames.forEach((folder) => {
      folderMap.set(folder, {
        id: folder,
        name: folder.charAt(0).toUpperCase() + folder.slice(1),
        count: 0,
        icon: icons[folder as keyof typeof icons],
      });
    });

    emails.forEach((email) => {
      const folder =
        email.from === user?.email
          ? "sent"
          : (email.folder as keyof typeof icons);
      if (folderMap.has(folder)) {
        const current = folderMap.get(folder)!;
        if (!email.read) {
          folderMap.set(folder, { ...current, count: current.count + 1 });
        }
      }
      if (email.folder === "important" && folderMap.has("inbox")) {
        const inbox = folderMap.get("inbox")!;
        if (!email.read) {
          folderMap.set("inbox", { ...inbox, count: inbox.count + 1 });
        }
      }
    });

    setFolders(Array.from(folderMap.values()));
  }, [emails, user]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const filteredEmails = emails
    .map((email) => ({
      ...email,
      folder: email.from === user?.email ? "sent" : email.folder,
    }))
    .filter(
      (email) =>
        email.folder === currentFolder ||
        (email.folder === "important" && currentFolder === "inbox")
    );

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col">
      <Header
        onShowProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full p-8">
        {user && <UserInfo user={user} />}

        <div className="grid grid-cols-[200px_1fr] gap-4">
          <FolderList
            folders={folders}
            currentFolder={currentFolder}
            onFolderChange={setCurrentFolder}
          />

          <div>
            {showProfile && user ? (
              <UserProfile user={user} onClose={() => setShowProfile(false)} />
            ) : selectedEmail ? (
              <EmailView
                email={selectedEmail}
                onBack={() => setSelectedEmail(null)}
              />
            ) : (
              <EmailList
                emails={filteredEmails}
                onSelectEmail={setSelectedEmail}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
