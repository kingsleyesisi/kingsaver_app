import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() async {
    await Future.delayed(const Duration(milliseconds: 3000));
    if (!mounted) return;
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const HomeScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          color: Color(0xFF0F0F0F),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo Placeholder
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [Color(0xFFFFD700), Color(0xFFEAB308)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFFFD700).withOpacity(0.3),
                    blurRadius: 30,
                    spreadRadius: 5,
                  ),
                ],
              ),
              child: const Icon(Icons.king_bed, size: 60, color: Colors.black),
            ).animate().scale(duration: 1000.ms, curve: Curves.elasticOut).shake(delay: 500.ms),
            
            const SizedBox(height: 30),
            
            RichText(
              text: TextSpan(
                style: const TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 2.0,
                ),
                children: [
                  const TextSpan(text: "KING "),
                  TextSpan(
                    text: "SAVER",
                    style: TextStyle(color: Theme.of(context).primaryColor),
                  ),
                ],
              ),
            ).animate().fadeIn(duration: 1000.ms).moveY(begin: 20, end: 0),
            
            const SizedBox(height: 10),
            
            const Text(
              "PREMIUM DOWNLOADER",
              style: TextStyle(
                color: Colors.grey,
                letterSpacing: 4.0,
                fontSize: 12,
                fontWeight: FontWeight.w300,
              ),
            ).animate().fadeIn(delay: 1500.ms),
            
            const SizedBox(height: 60),
            
            // Loading Indicator
            SizedBox(
              width: 200,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: LinearProgressIndicator(
                  backgroundColor: Colors.grey[900],
                  valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFFFFD700)),
                ),
              ),
            ).animate().fadeIn(delay: 2000.ms),
          ],
        ),
      ),
    );
  }
}
