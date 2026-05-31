import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  getListProjectsQueryKey,
} from "@workspace/api-client-react";
import type { Project, ProjectInput, ProjectUpdate } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, FolderOpen, Lock } from "lucide-react";

const ADMIN_KEY_SESSION = "admin_key";
const CATEGORIES = [
  "TPO Roofing",
  "EPDM Roofing",
  "Metal Roofing",
  "Built-Up Roofing",
  "Roof Coatings",
  "Storm Damage",
  "Roof Repair",
  "Other",
];

type FormData = {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
};

const emptyForm: FormData = {
  title: "",
  location: "",
  description: "",
  imageUrl: "",
  category: "",
};

function adminKeyHeaders(key: string): RequestInit {
  return { headers: { "x-admin-key": key } };
}

function LoginGate({ onLogin }: { onLogin: (key: string) => void }) {
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (keyInput.trim().length < 8) {
      setError(true);
      return;
    }
    onLogin(keyInput.trim());
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter your admin key to manage the project gallery.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-key">Admin Key</Label>
            <Input
              id="admin-key"
              type="password"
              placeholder="Paste your admin key…"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500">Please enter a valid admin key.</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

function ProjectForm({
  value,
  onChange,
}: {
  value: FormData;
  onChange: (v: FormData) => void;
}) {
  const field = (key: keyof FormData) => ({
    value: value[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => onChange({ ...value, [key]: e.target.value }),
  });

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="pf-title">Title</Label>
        <Input id="pf-title" placeholder="e.g. Warehouse TPO Replacement" {...field("title")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pf-location">Location</Label>
        <Input id="pf-location" placeholder="e.g. Dallas, TX" {...field("location")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pf-category">Category</Label>
        <select
          id="pf-category"
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select a category…</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pf-image">Image URL</Label>
        <Input
          id="pf-image"
          placeholder="https://…"
          {...field("imageUrl")}
        />
        {value.imageUrl && (
          <img
            src={value.imageUrl}
            alt="Preview"
            className="mt-2 h-24 w-full rounded-md object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pf-description">Description</Label>
        <Textarea
          id="pf-description"
          rows={3}
          placeholder="Brief description of the project…"
          {...field("description")}
        />
      </div>
    </div>
  );
}

function isFormValid(f: FormData) {
  return (
    f.title.trim().length > 0 &&
    f.location.trim().length > 0 &&
    f.category.trim().length > 0 &&
    f.imageUrl.trim().length > 0 &&
    f.description.trim().length > 0
  );
}

function ProjectsPanel({ adminKey, onAuthError }: { adminKey: string; onAuthError: () => void }) {
  const queryClient = useQueryClient();
  const { data: projects, isLoading, isError } = useListProjects();
  const adminReq = adminKeyHeaders(adminKey);

  const createProject = useCreateProject({
    request: adminReq,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setAddOpen(false);
        setForm(emptyForm);
      },
      onError: (err) => {
        if ("status" in err && err.status === 403) onAuthError();
      },
    },
  });

  const updateProject = useUpdateProject({
    request: adminReq,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setEditProject(null);
        setForm(emptyForm);
      },
      onError: (err) => {
        if ("status" in err && err.status === 403) onAuthError();
      },
    },
  });

  const deleteProject = useDeleteProject({
    request: adminReq,
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setDeleteId(null);
      },
      onError: (err) => {
        if ("status" in err && err.status === 403) onAuthError();
      },
    },
  });

  const [addOpen, setAddOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);

  function openAdd() {
    setForm(emptyForm);
    setAddOpen(true);
  }

  function openEdit(project: Project) {
    setForm({
      title: project.title,
      location: project.location,
      description: project.description,
      imageUrl: project.imageUrl,
      category: project.category,
    });
    setEditProject(project);
  }

  function handleCreate() {
    const input: ProjectInput = {
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      category: form.category.trim(),
    };
    createProject.mutate({ data: input });
  }

  function handleUpdate() {
    if (!editProject) return;
    const update: ProjectUpdate = {
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      category: form.category.trim(),
    };
    updateProject.mutate({ id: editProject.id, data: update });
  }

  function handleDelete() {
    if (deleteId === null) return;
    deleteProject.mutate({ id: deleteId });
  }

  return (
    <>
      <section className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Portfolio Projects</h2>
            {projects && (
              <Badge variant="secondary" className="ml-1">
                {projects.length}
              </Badge>
            )}
          </div>
          <Button onClick={openAdd} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {isLoading && (
          <div className="px-6 py-12 text-center text-gray-400">Loading projects…</div>
        )}
        {isError && (
          <div className="px-6 py-12 text-center text-red-500">
            Failed to load projects. Please try refreshing the page.
          </div>
        )}
        {projects && projects.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-400">
            No projects yet. Click "Add Project" to create your first one.
          </div>
        )}

        {projects && projects.length > 0 && (
          <ul className="divide-y divide-gray-100">
            {projects.map((project) => (
              <li key={project.id} className="flex items-start gap-4 px-6 py-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-16 w-24 flex-shrink-0 rounded-lg object-cover bg-gray-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='64' fill='%23e5e7eb'%3E%3Crect width='96' height='64'/%3E%3C/svg%3E";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900 truncate">{project.title}</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{project.location}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex gap-2 shrink-0 pt-0.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(project)}
                    title="Edit project"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => setDeleteId(project.id)}
                    title="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Project Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm value={form} onChange={setForm} />
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!isFormValid(form) || createProject.isPending}
            >
              {createProject.isPending ? "Saving…" : "Add Project"}
            </Button>
          </DialogFooter>
          {createProject.isError && (
            <p className="text-sm text-red-500 mt-1">Failed to save. Please try again.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={!!editProject} onOpenChange={(open) => !open && setEditProject(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm value={form} onChange={setForm} />
          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setEditProject(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!isFormValid(form) || updateProject.isPending}
            >
              {updateProject.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </DialogFooter>
          {updateProject.isError && (
            <p className="text-sm text-red-500 mt-1">Failed to save. Please try again.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the project from the gallery. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function AdminDashboard() {
  const storedKey = sessionStorage.getItem(ADMIN_KEY_SESSION) ?? "";
  const [adminKey, setAdminKey] = useState(storedKey);

  function handleLogin(key: string) {
    sessionStorage.setItem(ADMIN_KEY_SESSION, key);
    setAdminKey(key);
  }

  function handleSignOut() {
    sessionStorage.removeItem(ADMIN_KEY_SESSION);
    setAdminKey("");
  }

  function handleAuthError() {
    sessionStorage.removeItem(ADMIN_KEY_SESSION);
    setAdminKey("");
  }

  if (!adminKey) {
    return <LoginGate onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Manage gallery projects — changes appear on the public site immediately.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        <ProjectsPanel adminKey={adminKey} onAuthError={handleAuthError} />
      </div>
    </div>
  );
}
