"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className="fixed top-6 right-1/2 transform translate-x-1/2 z-10">
            <div className="bg-[#E6DABE] rounded-full px-2 py-1 flex gap-1">
                <Link
                    href="/about"
                    className={`px-4 py-1.5 rounded-full text-[#5a4d3a] transition-colors ${pathname === "/about"
                        ? "bg-[#FFF6E2]"
                        : "hover:bg-[#d4c4a8]"
                        }`}
                >
                    אודות
                </Link>
                <Link
                    href="/"
                    className={`px-4 py-1.5 rounded-full text-[#5a4d3a] transition-colors ${pathname === "/"
                        ? "bg-[#FFF6E2]"
                        : "hover:bg-[#d4c4a8]"
                        }`}
                >
                    צ׳אט
                </Link>
            </div>
        </div>
    );
};

const AboutPage = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative w-[95%] h-[90%] rounded-3xl bg-[#E6DABE] flex flex-col">
                <div className="absolute top-4 right-4 text-xs text-[#FFF6E2]">בס"ד</div>
                <NavBar />

                <div className="flex-1 overflow-y-auto px-8 pt-32 pb-8">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-[#5a4d3a] text-right mb-8" dir="rtl">
                            ברוכים הבאים למערכת שו״ת RabbAI
                        </h1>

                        <div className="space-y-6 text-right">
                            <p className="text-[#5a4d3a]" dir="rtl">
                                המערכת שלנו משלבת טכנולוגיית בינה מלאכותית מתקדמת עם מאגר עשיר של שאלות ותשובות הלכתיות, במטרה לספק מענה מדויק ומהיר לשאלות הלכתיות.
                            </p>

                            <div className="bg-[#FFF6E2] rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-bold text-[#5a4d3a] mb-4" dir="rtl">
                                    איך זה עובד?
                                </h2>
                                <ul className="list-disc list-inside space-y-3 text-[#5a4d3a]" dir="rtl">
                                    <li>שאלו את השאלה ההלכתית שלכם בשפה טבעית</li>
                                    <li>המערכת מנתחת את השאלה ומחפשת תשובות רלוונטיות ממאגר השו״ת</li>
                                    <li>התשובה מוצגת יחד עם המקורות הרלוונטיים</li>
                                    <li>תוכלו לצפות במקורות המדויקים עליהם מתבססת התשובה</li>
                                </ul>
                            </div>

                            <div className="bg-[#FFF6E2] rounded-lg p-6">
                                <h2 className="text-xl font-bold text-[#5a4d3a] mb-4" dir="rtl">
                                    הערה חשובה
                                </h2>
                                <p className="text-[#5a4d3a]" dir="rtl">
                                    חשוב לציין כי המערכת מיועדת למטרות לימוד והעשרה בלבד, ואינה מחליפה פסיקה הלכתית של רב מוסמך. בכל שאלה הלכתית מעשית, יש להתייעץ עם רב.
                                </p>
                            </div>

                            <div className="bg-[#FFF6E2] rounded-lg p-6">
                                <h2 className="text-xl font-bold text-[#5a4d3a] mb-4" dir="rtl">
                                    שימוש במערכת
                                </h2>
                                <p className="text-[#5a4d3a]" dir="rtl">
                                    המערכת נועדה להיות נגישה וידידותית למשתמש. ניתן לשאול שאלות בשפה טבעית, והמערכת תספק תשובות מבוססות על מקורות הלכתיים. לכל תשובה מצורפים המקורות הרלוונטיים, אותם ניתן לראות בלחיצה על כפתור ״הצג מקורות שו״ת״.
                                </p>
                            </div>

                            <div className="bg-[#FFF6E2] rounded-lg p-6">
                                <h2 className="text-xl font-bold text-[#5a4d3a] mb-4" dir="rtl">
                                    יוצרי המערכת
                                </h2>
                                <p className="text-[#5a4d3a]" dir="rtl">
                                    המערכת נוצרה על ידי: <br />
                                    אפרים אלגרבלי. <br />
                                    יוסף קורנפלד. <br />
                                    תומר קלמן. <br /> <br />
                                    כל הזכויות שמורות לצוות המפתחים.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;