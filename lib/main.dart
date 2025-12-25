import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'screens/splash_screen.dart';
import 'services/api_service.dart';
import 'services/history_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ApiService()),
        ChangeNotifierProvider(create: (_) => HistoryService()),
      ],
      child: const KingSaverApp(),
    ),
  );
}

class KingSaverApp extends StatelessWidget {
  const KingSaverApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'The King Saver',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0F0F0F),
        primaryColor: const Color(0xFFFFD700),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFFD700),
          brightness: Brightness.dark,
          primary: const Color(0xFFFFD700),
          secondary: const Color(0xFFFACC15),
          background: const Color(0xFF0F0F0F),
          surface: const Color(0xFF1A1A1A),
        ),
        textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
          displayLarge: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
          displayMedium: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
          titleLarge: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFFFD700)),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFFD700),
            foregroundColor: Colors.black,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            textStyle: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
