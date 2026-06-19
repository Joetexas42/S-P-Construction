import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  getListProjectsQueryKey,
  useListContactSubmissions,
  useListEstimatorSubmissions,
  useListPaperStreetContactSubmissions,
  getSiteRefreshStatus,
} from "@workspace/api-client-react";
import type { Project, ProjectInput, ProjectUpdate, ContactSubmission, EstimatorSubmission, PaperStreetContact, SiteRefreshStatus } from "@workspace/api-client-react";
import { useUpload } from "@workspace/object-storage-web";
import { useToast } from "@/hooks/use-toast";
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
import { Pencil, Trash2, Plus, FolderOpen, Lock, Upload, X, ImageIcon, Mail, PhoneCall, Calculator, MessageSquare, AlertTriangle } from "lucide-react";
import { getApiUrl, resolveStorageUrl } from "@/lib/api-url";

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
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const key = keyInput.trim();
    if (!key) {
      setError("Please enter your admin key.");
      return;
    }
    setIsPending(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl("/api/admin/verify"), {
        method: "POST",
        headers: { "x-admin-key": key },
      });
      if (res.ok) {
        onLogin(key);
      } else {
        setError("Incorrect admin key. Please try again.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setIsPending(false);
    }
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
                setError(null);
              }}
              autoFocus
              disabled={isPending}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ProjectThumbnail({
  src,
  alt,
  onStatusChange,
}: {
  src: string;
  alt: string;
  onStatusChange?: (isBroken: boolean) => void;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="h-16 w-24 flex-shrink-0 rounded-lg bg-amber-50 ring-1 ring-amber-200 flex flex-col items-center justify-center gap-1 text-amber-500">
        <ImageIcon className="h-5 w-5" />
        <span className="text-[9px] font-medium uppercase tracking-wide">No photo</span>
      </div>
    );
  }

  return (
    <img
      src={resolveStorageUrl(src)}
      alt={alt}
      className="h-16 w-24 flex-shrink-0 rounded-lg object-cover bg-gray-100"
      onError={() => {
        setFailed(true);
        onStatusChange?.(true);
      }}
      onLoad={() => onStatusChange?.(false)}
    />
  );
}

function ImageUploadField({
  value,
  onChange,
  adminKey,
}: {
  value: string;
  onChange: (url: string) => void;
  adminKey: string;
}) {
  const { uploadFile, isUploading, progress, error } = useUpload({
    // In split-origin (Cloudflare Pages + Railway), the presign request must
    // go to the Railway API origin, not the Pages origin.
    basePath: getApiUrl("/api/storage"),
    // Forward the admin key so the protected presign endpoint returns 200.
    requestHeaders: { "x-admin-key": adminKey },
    onSuccess: (response) => {
      // Store the canonical "/objects/..." path so it resolves correctly in
      // both same-origin (dev) and split-origin (Cloudflare Pages + Railway).
      onChange(response.objectPath);
    },
  });

  const [previewFailed, setPreviewFailed] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    e.target.value = "";
  }

  function handleClear() {
    onChange("");
    setPreviewFailed(false);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative">
          {previewFailed ? (
            <div className="h-32 w-full rounded-lg bg-gray-100 flex flex-col items-center justify-center gap-1.5 text-gray-400">
              <ImageIcon className="h-7 w-7" />
              <span className="text-xs font-medium uppercase tracking-wide">Photo unavailable</span>
            </div>
          ) : (
            <img
              src={resolveStorageUrl(value)}
              alt="Project photo"
              className="h-32 w-full rounded-lg object-cover bg-gray-100"
              onError={() => setPreviewFailed(true)}
            />
          )}
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-900/70 text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            title="Remove photo"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
            isUploading
              ? "border-primary/40 bg-primary/5"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-primary">
              <Upload className="h-6 w-6 animate-bounce" />
              <span className="text-sm font-medium">Uploading… {progress}%</span>
              <div className="w-32 h-1.5 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-gray-400">
              <ImageIcon className="h-6 w-6" />
              <span className="text-sm font-medium text-gray-600">Click to upload a photo</span>
              <span className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB</span>
            </div>
          )}
        </label>
      )}
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}

function ProjectForm({
  value,
  onChange,
  adminKey,
}: {
  value: FormData;
  onChange: (v: FormData) => void;
  adminKey: string;
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
        <Label>Project Photo</Label>
        <ImageUploadField
          value={value.imageUrl}
          onChange={(url) => onChange({ ...value, imageUrl: url })}
          adminKey={adminKey}
        />
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
  const { toast } = useToast();
  const { data: projects, isLoading, isError } = useListProjects();
  const adminReq = adminKeyHeaders(adminKey);

  async function notifySiteRefresh(siteRefresh: SiteRefreshStatus, action: string) {
    if (!siteRefresh.configured || !siteRefresh.scheduled) {
      toast({
        variant: "destructive",
        title: `Project ${action} — live site not refreshed`,
        description:
          "Automatic site refresh isn't configured, so the public Projects page won't update on its own. Publish the site manually to push the change live.",
      });
      return;
    }

    // The rebuild is only *scheduled* here — the deploy hook fires
    // asynchronously (and is debounced) on the server. Poll the status endpoint
    // for the real outcome so admins are never shown a misleading success.
    const pending = toast({
      title: `Project ${action}`,
      description: "Refreshing the live site…",
    });

    const deadline = Date.now() + 45_000;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 2_000));
      let status;
      try {
        status = await getSiteRefreshStatus(adminReq);
      } catch {
        continue;
      }
      if (status.state === "success") {
        pending.update({
          id: pending.id,
          title: `Project ${action}`,
          description:
            "Live site refresh complete — the public Projects page is up to date.",
        });
        return;
      }
      if (status.state === "failed") {
        pending.update({
          id: pending.id,
          variant: "destructive",
          title: `Project ${action} — live site refresh failed`,
          description:
            status.error
              ? `The refresh couldn't be started (${status.error}). Try again or publish the site manually.`
              : "The refresh couldn't be started. Try again or publish the site manually.",
        });
        return;
      }
    }

    pending.update({
      id: pending.id,
      title: `Project ${action}`,
      description:
        "Live site refresh is taking longer than usual — it should finish shortly.",
    });
  }

  const createProject = useCreateProject({
    request: adminReq,
    mutation: {
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setAddOpen(false);
        setForm(emptyForm);
        void notifySiteRefresh(result.siteRefresh, "added");
      },
      onError: (err) => {
        if ("status" in err && err.status === 403) onAuthError();
      },
    },
  });

  const updateProject = useUpdateProject({
    request: adminReq,
    mutation: {
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setEditProject(null);
        setForm(emptyForm);
        void notifySiteRefresh(result.siteRefresh, "saved");
      },
      onError: (err) => {
        if ("status" in err && err.status === 403) onAuthError();
      },
    },
  });

  const deleteProject = useDeleteProject({
    request: adminReq,
    mutation: {
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setDeleteId(null);
        void notifySiteRefresh(result.siteRefresh, "deleted");
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
  const [brokenIds, setBrokenIds] = useState<Set<number>>(new Set());
  const [showBrokenOnly, setShowBrokenOnly] = useState(false);

  const handlePhotoStatus = useCallback((id: number, isBroken: boolean) => {
    setBrokenIds((prev) => {
      const has = prev.has(id);
      if (isBroken === has) return prev;
      const next = new Set(prev);
      if (isBroken) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  // Drop ids for projects that no longer exist (e.g. after delete) so the
  // banner count stays accurate.
  useEffect(() => {
    if (!projects) return;
    setBrokenIds((prev) => {
      if (prev.size === 0) return prev;
      const existing = new Set(projects.map((p) => p.id));
      let changed = false;
      const next = new Set<number>();
      for (const id of prev) {
        if (existing.has(id)) next.add(id);
        else changed = true;
      }
      return changed ? next : prev;
    });
  }, [projects]);

  const brokenCount = brokenIds.size;
  const filterActive = showBrokenOnly && brokenCount > 0;
  const visibleProjects =
    projects && filterActive
      ? projects.filter((p) => brokenIds.has(p.id))
      : projects;

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
        <p className="px-6 pt-3 text-xs text-gray-500">
          Saved projects appear on the live gallery right away. Each change also
          kicks off an automatic refresh of the public Projects page so its
          search-engine snapshot stays up to date — you'll see a confirmation
          after each save.
        </p>

        {brokenCount > 0 && (
          <div className="mx-6 mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
              <span>
                <span className="font-semibold">
                  {brokenCount} {brokenCount === 1 ? "project" : "projects"}
                </span>{" "}
                {brokenCount === 1 ? "has" : "have"} a missing photo.
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 bg-white text-amber-800 hover:bg-amber-100 hover:text-amber-900"
              onClick={() => setShowBrokenOnly((v) => !v)}
            >
              {filterActive ? "Show all projects" : "Show only these"}
            </Button>
          </div>
        )}

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

        {visibleProjects && visibleProjects.length > 0 && (
          <ul className="divide-y divide-gray-100">
            {visibleProjects.map((project) => (
              <li key={project.id} className="flex items-start gap-4 px-6 py-4">
                <ProjectThumbnail
                  src={project.imageUrl}
                  alt={project.title}
                  onStatusChange={(isBroken) => handlePhotoStatus(project.id, isBroken)}
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
          <ProjectForm value={form} onChange={setForm} adminKey={adminKey} />
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
          <ProjectForm value={form} onChange={setForm} adminKey={adminKey} />
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}


function RoofingLeadsPanel({ adminKey }: { adminKey: string }) {
  const { data: submissions, isLoading, isError } = useListContactSubmissions({
    request: adminKeyHeaders(adminKey),
  });

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <PhoneCall className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Roofing Leads</h2>
        {submissions && (
          <Badge variant="secondary" className="ml-1">
            {submissions.length}
          </Badge>
        )}
      </div>

      {isLoading && (
        <div className="px-6 py-12 text-center text-gray-400">Loading leads…</div>
      )}
      {isError && (
        <div className="px-6 py-12 text-center text-red-500">
          Failed to load leads. Please try refreshing the page.
        </div>
      )}
      {submissions && submissions.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-400">
          No roofing leads yet.
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <ul className="divide-y divide-gray-100">
          {submissions.map((s: ContactSubmission) => (
            <li key={s.id} className="px-6 py-4 space-y-1.5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900">{s.name}</span>
                    <Badge variant="outline" className="text-xs">{s.serviceType}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline">
                      {s.email}
                    </a>
                    {s.phone && (
                      <a href={`tel:${s.phone}`} className="hover:underline">
                        {s.phone}
                      </a>
                    )}
                    {s.city && <span>{s.city}</span>}
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{formatDate(s.createdAt)}</span>
              </div>
              {s.message && (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{s.message}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function EstimatorSubmissionsPanel({ adminKey }: { adminKey: string }) {
  const { data: submissions, isLoading, isError } = useListEstimatorSubmissions({
    request: adminKeyHeaders(adminKey),
  });

  function formatCost(usd: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(usd);
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Estimator Submissions</h2>
        {submissions && (
          <Badge variant="secondary" className="ml-1">
            {submissions.length}
          </Badge>
        )}
      </div>

      {isLoading && (
        <div className="px-6 py-12 text-center text-gray-400">Loading submissions…</div>
      )}
      {isError && (
        <div className="px-6 py-12 text-center text-red-500">
          Failed to load submissions. Please try refreshing the page.
        </div>
      )}
      {submissions && submissions.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-400">
          No estimator submissions yet.
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <ul className="divide-y divide-gray-100">
          {submissions.map((s: EstimatorSubmission) => (
            <li key={s.id} className="px-6 py-4 space-y-1.5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900">{s.name}</span>
                    <Badge variant="outline" className="text-xs">{s.serviceType}</Badge>
                    <Badge className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
                      {formatCost(s.estimatedCostUsd)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline">
                      {s.email}
                    </a>
                    {s.phone && (
                      <a href={`tel:${s.phone}`} className="hover:underline">
                        {s.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{s.address}</p>
                  <p className="text-xs text-gray-400">
                    {s.roofSqft.toLocaleString()} sq ft · ${s.pricePerSqft}/sqft
                  </p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{formatDate(s.createdAt)}</span>
              </div>
              {s.message && (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{s.message}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PaperStreetInquiriesPanel({ adminKey }: { adminKey: string }) {
  const { data: submissions, isLoading, isError } = useListPaperStreetContactSubmissions({
    request: adminKeyHeaders(adminKey),
  });

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Paper Street Inquiries</h2>
        {submissions && (
          <Badge variant="secondary" className="ml-1">
            {submissions.length}
          </Badge>
        )}
      </div>

      {isLoading && (
        <div className="px-6 py-12 text-center text-gray-400">Loading inquiries…</div>
      )}
      {isError && (
        <div className="px-6 py-12 text-center text-red-500">
          Failed to load inquiries. Please try refreshing the page.
        </div>
      )}
      {submissions && submissions.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-400">
          No Paper Street inquiries yet.
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <ul className="divide-y divide-gray-100">
          {submissions.map((s: PaperStreetContact) => (
            <li key={s.id} className="px-6 py-4 space-y-1.5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <span className="font-medium text-gray-900">{s.name}</span>
                  <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline">
                      {s.email}
                    </a>
                    {s.phone && (
                      <a href={`tel:${s.phone}`} className="hover:underline">
                        {s.phone}
                      </a>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{formatDate(s.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{s.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
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

        <div className="space-y-8">
          <RoofingLeadsPanel adminKey={adminKey} />
          <EstimatorSubmissionsPanel adminKey={adminKey} />
          <PaperStreetInquiriesPanel adminKey={adminKey} />
          <ProjectsPanel adminKey={adminKey} onAuthError={handleAuthError} />
        </div>
      </div>
    </div>
  );
}
