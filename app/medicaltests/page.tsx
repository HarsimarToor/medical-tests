"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function MedicalTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [uoms, setUoms] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    idcategory: "",
    iduom: "",
    normalmin: "",
    normalmax: "",
  });

  useEffect(() => {
    fetchData();
    loadDropdowns();
  }, []);

  const fetchData = async () => {
    const { data } = await supabase.from("medicaltests").select(`
        id, name, normalmin, normalmax,
        testcategories(name),
        uom(name)
      `);
    setTests(data || []);
  };

  const loadDropdowns = async () => {
    const { data: catData } = await supabase.from("testcategories").select("*");
    const { data: uomData } = await supabase.from("uom").select("*");
    setCategories(catData || []);
    setUoms(uomData || []);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("medicaltests").insert([formData]);
    setFormData({
      name: "",
      idcategory: "",
      iduom: "",
      normalmin: "",
      normalmax: "",
    });
    fetchData();
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      tests.map((t: any) => ({
        Name: t.name,
        Category: t.testcategories?.name,
        Unit: t.uom?.name,
        Min: t.normalmin,
        Max: t.normalmax,
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tests");
    XLSX.writeFile(workbook, "MedicalTests.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Medical Tests Report", 14, 10);
    (doc as any).autoTable({
      head: [["Name", "Category", "Unit", "Min", "Max"]],
      body: tests.map((t: any) => [
        t.name,
        t.testcategories?.name,
        t.uom?.name,
        t.normalmin,
        t.normalmax,
      ]),
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [16, 185, 129] }, // Emerald green header for PDF
    });
    doc.save("MedicalTests.pdf");
  };

  // Reusable input class for the high-end look
  const inputClass =
    "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col pt-10 px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight mb-2">
            Medical Tests
          </h1>
          <p className="text-zinc-400">
            Configure tests, set ranges, and manage laboratory data.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-zinc-800/50 hover:bg-emerald-500/10 text-emerald-400 border border-zinc-700/50 hover:border-emerald-500/50 px-4 py-2 rounded-xl transition-all shadow-lg text-sm font-semibold"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Excel
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-zinc-800/50 hover:bg-cyan-500/10 text-cyan-400 border border-zinc-700/50 hover:border-cyan-500/50 px-4 py-2 rounded-xl transition-all shadow-lg text-sm font-semibold"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Add Form Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-6 shadow-2xl mb-10">
        <h2 className="text-lg font-semibold text-zinc-100 mb-6 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Test
        </h2>
        <form
          onSubmit={handleAdd}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          <div className="lg:col-span-2">
            <input
              placeholder="Test Name (e.g. Hemoglobin)"
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
            />
          </div>

          <div>
            <select
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, idcategory: e.target.value })
              }
              value={formData.idcategory}
              required
            >
              <option value="" className="bg-zinc-900 text-zinc-400">
                Category
              </option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id} className="bg-zinc-900">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, iduom: e.target.value })
              }
              value={formData.iduom}
              required
            >
              <option value="" className="bg-zinc-900 text-zinc-400">
                Unit (UOM)
              </option>
              {uoms.map((u: any) => (
                <option key={u.id} value={u.id} className="bg-zinc-900">
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, normalmin: e.target.value })
              }
              value={formData.normalmin}
            />
            <input
              type="number"
              placeholder="Max"
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, normalmax: e.target.value })
              }
              value={formData.normalmax}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-full min-h-[48px] bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Save Test
            </button>
          </div>
        </form>
      </div>

      {/* Data Table Card */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800/80">
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Unit
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Normal Range
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-sm">
              {tests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-zinc-500">
                    No medical tests found. Add one above.
                  </td>
                </tr>
              ) : (
                tests.map((test: any) => (
                  <tr
                    key={test.id}
                    className="hover:bg-zinc-800/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-medium text-zinc-200">
                      {test.name}
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {test.testcategories?.name || "—"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      {test.uom?.name || "—"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded-md border border-zinc-700/50 min-w-[3rem] text-center">
                          {test.normalmin || "-"}
                        </span>
                        <span className="text-zinc-500">-</span>
                        <span className="text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded-md border border-zinc-700/50 min-w-[3rem] text-center">
                          {test.normalmax || "-"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
